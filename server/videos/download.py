import os

def downlaod_video(url):
    os.system(f"youtube-dl --output my_webapp/videos/%(title)s.%(ext)s -f mp4 {url}")
downlaod_video("https://youtu.be/x7X9w_GIm1s")
