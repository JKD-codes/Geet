from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from ytmusicapi import YTMusic
from typing import Optional
import yt_dlp

app = FastAPI(title="Geet YTMusic API", docs_url="/api/docs", openapi_url="/api/openapi.json")

# Setup CORS so the Next.js app can fetch locally during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Initialize YTMusic
ytmusic = YTMusic()

@app.get("/api")
def read_root():
    return {"status": "ok", "message": "Geet YTMusic API is running on Vercel Serverless"}

@app.get("/api/search")
def search(q: str, filter: Optional[str] = None, limit: int = 20):
    try:
        results = ytmusic.search(query=q, filter=filter, limit=limit)
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/song/{video_id}")
def get_song(video_id: str):
    try:
        song = ytmusic.get_song(video_id)
        return song
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/artist/{channel_id}")
def get_artist(channel_id: str):
    try:
        artist = ytmusic.get_artist(channel_id)
        return artist
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/album/{browse_id}")
def get_album(browse_id: str):
    try:
        album = ytmusic.get_album(browse_id)
        return album
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/up-next/{video_id}")
def get_up_next(video_id: str):
    try:
        # Get 'up next' or watch playlist for recommendations
        watch_playlist = ytmusic.get_watch_playlist(videoId=video_id)
        return watch_playlist
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/stream/{video_id}")
def get_stream_url(video_id: str):
    ydl_opts = {
        'format': 'bestaudio/best',
        'quiet': True,
        'no_warnings': True,
        'extract_flat': False
    }
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(f"https://www.youtube.com/watch?v={video_id}", download=False)
            url = info.get('url', None)
            if not url:
                raise Exception("Could not extract stream URL")
            return {"url": url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
