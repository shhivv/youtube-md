# YouTube Markdown Summary API

## Base URL

```
https://ytmd.shivs.me
```

## Endpoints

### Generate Markdown Summary

**Endpoint**: `/`

**Method**: `GET`

**Description**: Takes a YouTube URL as a query parameter and returns a markdown summary of the video's content.

**Request**

- **Query Parameter**:
  - `url`: The YouTube video URL (e.g., `https://www.youtube.com/watch?v=example`)

**Response**

- **Success** (`200 OK`):

Example
```
# Centripetal Acceleration and Physics Problem Solving

## Introduction
- Focus: Centripetal acceleration and solving physics problems related to it
- Objectives: Understanding acceleration in different scenarios

## Acceleration and Velocity
1. Positive Acceleration:
   - Object moving right, speeding up: Acceleration and velocity vectors parallel
2. Negative Acceleration:
   - Object moving right, slowing down: Acceleration and velocity vectors opposite
3. Constant Speed in a Circle:
   - Acceleration present: Centripetal acceleration due to changing direction
...
```


### cURL

```sh
curl https://ytmd.shivs.me?url="https://www.youtube.com/watch?v=ZbLirQuT9uU&"
```