# NID Mock Server API Documentation

## Base URL
```
http://localhost:3000
```

## Available Endpoints

### 1. Get All NIDs
**GET** `/api/nid`

Returns all NID records in the database.

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "id": 1,
      "nid": "1234567890123",
      "name": "Ahmed Rahman",
      "father_name": "Abdul Rahman",
      "mother_name": "Fatima Begum",
      "date_of_birth": "1985-03-15",
      "gender": "Male",
      "blood_group": "B+",
      "religion": "Islam",
      "marital_status": "Married",
      "address": {
        "village": "Dhaka Para",
        "post_office": "Dhaka Cantonment",
        "thana": "Dhaka Cantonment",
        "district": "Dhaka",
        "division": "Dhaka"
      },
      "issue_date": "2010-06-20",
      "expiry_date": "2030-06-20",
      "photo_url": "https://example.com/photos/ahmed_rahman.jpg"
    }
  ]
}
```

### 2. Get NID by ID
**GET** `/api/nid/id/{id}`

Returns a specific NID record by its ID.

**Parameters:**
- `id` (number): The unique ID of the NID record

**Example:** `GET /api/nid/id/1`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nid": "1234567890123",
    "name": "Ahmed Rahman",
    // ... other fields
  }
}
```

### 3. Get NID by NID Number
**GET** `/api/nid/number/{nidNumber}`

Returns a specific NID record by its NID number.

**Parameters:**
- `nidNumber` (string): The 13-digit NID number

**Example:** `GET /api/nid/number/1234567890123`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nid": "1234567890123",
    "name": "Ahmed Rahman",
    // ... other fields
  }
}
```

### 4. Search NIDs by Name
**GET** `/api/nid/search/name/{name}`

Searches for NID records by name (case-insensitive partial match).

**Parameters:**
- `name` (string): The name to search for

**Example:** `GET /api/nid/search/name/ahmed`

**Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "nid": "1234567890123",
      "name": "Ahmed Rahman",
      // ... other fields
    }
  ]
}
```

### 5. Get NIDs by District
**GET** `/api/nid/district/{district}`

Returns all NID records from a specific district.

**Parameters:**
- `district` (string): The district name (case-insensitive)

**Example:** `GET /api/nid/district/dhaka`

**Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "nid": "1234567890123",
      "name": "Ahmed Rahman",
      // ... other fields
    }
  ]
}
```

### 6. Get NIDs by Division
**GET** `/api/nid/division/{division}`

Returns all NID records from a specific division.

**Parameters:**
- `division` (string): The division name (case-insensitive)

**Example:** `GET /api/nid/division/dhaka`

**Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "nid": "1234567890123",
      "name": "Ahmed Rahman",
      // ... other fields
    }
  ]
}
```

## Error Responses

### 404 Not Found
```json
{
  "success": false,
  "error": "NID not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Failed to fetch NID data"
}
```

## Available Districts
- Dhaka
- Chittagong
- Sylhet
- Rajshahi
- Khulna
- Barisal
- Rangpur
- Mymensingh
- Comilla
- Noakhali

## Available Divisions
- Dhaka
- Chittagong
- Sylhet
- Rajshahi
- Khulna
- Barisal
- Rangpur
- Mymensingh

## Testing Examples

### Using curl
```bash
# Get all NIDs
curl http://localhost:3000/api/nid

# Get NID by ID
curl http://localhost:3000/api/nid/id/1

# Get NID by number
curl http://localhost:3000/api/nid/number/1234567890123

# Search by name
curl http://localhost:3000/api/nid/search/name/ahmed

# Get by district
curl http://localhost:3000/api/nid/district/dhaka

# Get by division
curl http://localhost:3000/api/nid/division/dhaka
```

### Using JavaScript/Fetch
```javascript
// Get all NIDs
fetch('http://localhost:3000/api/nid')
  .then(response => response.json())
  .then(data => console.log(data));

// Search by name
fetch('http://localhost:3000/api/nid/search/name/ahmed')
  .then(response => response.json())
  .then(data => console.log(data));
```

## Data Structure

Each NID record contains the following fields:

| Field | Type | Description |
|-------|------|-------------|
| id | number | Unique identifier |
| nid | string | 13-digit NID number |
| name | string | Full name |
| father_name | string | Father's name |
| mother_name | string | Mother's name |
| date_of_birth | string | Date of birth (YYYY-MM-DD) |
| gender | string | Gender (Male/Female) |
| blood_group | string | Blood group |
| religion | string | Religion |
| marital_status | string | Marital status |
| address | object | Address information |
| issue_date | string | NID issue date |
| expiry_date | string | NID expiry date |
| photo_url | string | Photo URL |

## Server Information

- **Port:** 3000 (configurable via PORT environment variable)
- **Health Check:** `GET /health`
- **API Status:** `GET /api/status` 