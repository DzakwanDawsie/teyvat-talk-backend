# Teyvat Talk API

REST API untuk mengakses data karakter Genshin Impact.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start server
npm start

# Server running at http://localhost:3001
```

## 📖 API Endpoints

### Base URL
```
http://localhost:3001
```

---

### Health Check
```
GET /
```
Menampilkan informasi API dan daftar endpoint yang tersedia.

**Response:**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "name": "Genshin Character API",
    "version": "1.0.0",
    "endpoints": [...]
  }
}
```

---

### Get All Characters
```
GET /characters
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `element` | string | Filter by element (Pyro, Hydro, Electro, Cryo, Dendro, Anemo, Geo) |
| `weapon` | string | Filter by weapon (Sword, Claymore, Polearm, Bow, Catalyst) |
| `region` | string | Filter by region (Mondstadt, Liyue, Inazuma, Sumeru, Fontaine, Natlan, Snezhnaya) |
| `quality` | string | Filter by quality (4 Stars, 5 Stars) |

**Examples:**
```bash
# Get all characters
curl http://localhost:3001/characters

# Filter by element
curl "http://localhost:3001/characters?element=Pyro"

# Filter by weapon and region
curl "http://localhost:3001/characters?weapon=Sword&region=Mondstadt"
```

**Response:**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "count": 90,
    "characters": [...]
  }
}
```

---

### Get Character by Name
```
GET /characters/:name
```

**Example:**
```bash
curl http://localhost:3001/characters/Albedo
```

**Response:**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "character": {
      "name": "Albedo",
      "quality": "5 Stars",
      "element": "Geo",
      "weapon": "Sword",
      "region": "Mondstadt",
      ...
    }
  }
}
```

---

### Get Random Character
```
GET /characters/random
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `count` | number | Number of random characters (default: 1) |

**Examples:**
```bash
# Get 1 random character
curl http://localhost:3001/characters/random

# Get 5 random characters
curl "http://localhost:3001/characters/random?count=5"
```

---

### Search Characters
```
GET /characters/search
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `keyword` | string | **Required.** Search keyword |

**Example:**
```bash
curl "http://localhost:3001/characters/search?keyword=knight"
```

---

### Chat with Character
```
POST /chat
```

Chat dengan AI yang berperan sebagai karakter Genshin Impact.

**Request Body:**
| Field | Type | Description |
|-------|------|-------------|
| `character` | string | **Required.** Nama karakter untuk roleplay |
| `messages` | array | **Required.** Array of chat history |
| `messages[].role` | string | `user` atau `assistant` |
| `messages[].content` | string | Isi pesan |

**Examples:**
```bash
# Chat tanpa karakter
curl -X POST http://localhost:3001/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      { "role": "user", "content": "Apa itu Vision?" }
    ]
  }'

# Chat dengan karakter
curl -X POST http://localhost:3001/chat \
  -H "Content-Type: application/json" \
  -d '{
    "character": "Paimon",
    "messages": [
      { "role": "user", "content": "Halo, siapa kamu?" }
    ]
  }'

# Chat berkelanjutan (dengan history)
curl -X POST http://localhost:3001/chat \
  -H "Content-Type: application/json" \
  -d '{
    "character": "Paimon",
    "messages": [
      { "role": "user", "content": "Halo!" },
      { "role": "assistant", "content": "Halo Traveler! Paimon senang bertemu denganmu!" },
      { "role": "user", "content": "Apa makanan favoritmu?" }
    ]
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "character": "Paimon",
    "message": "Paimon suka sekali Sweet Madame dan Sticky Honey Roast! Hmm... Paimon jadi lapar..."
  }
}
```

---

### Get All Elements
```
GET /meta/elements
```

**Response:**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "elements": ["Geo", "Dendro", "Cryo", "Pyro", "Hydro", "Electro", "Anemo"]
  }
}
```

---

### Get All Weapons
```
GET /meta/weapons
```

**Response:**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "weapons": ["Sword", "Bow", "Claymore", "Polearm", "Catalyst"]
  }
}
```

---

### Get All Regions
```
GET /meta/regions
```

**Response:**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "regions": ["Mondstadt", "Sumeru", "Inazuma", "Snezhnaya", "Liyue", "Fontaine", "Natlan"]
  }
}
```

---

## 📁 Project Structure

```
genshin-chat-ai-backend/
├── assets/
│   └── characters.json       # Character data
├── controllers/
│   ├── BaseController.js     # Health check & 404
│   ├── CharacterController.js
│   └── ChatController.js     # AI Chat handler
├── services/
│   └── CharacterService.js   # Data operations
├── routes/
│   └── api.js                # Route definitions
├── utils/
│   ├── response.js           # Response utilities
│   ├── ollama.js             # Groq/Ollama API client
│   └── chat.js               # Chat narrative builder
├── index.js                  # App entry point
└── package.json
```

## 📝 Response Format

All API responses follow this format:

**Success:**
```json
{
  "success": true,
  "message": "Success",
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error message"
}
```

## 📜 License

ISC
