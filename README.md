# siestaNbrekkie Calendar Reservation
Reservation and lodging information microservice for a hotel reservation web application

## Related Projects
  - https://github.com/siestaNbrekkie/reviews
  - https://github.com/siestaNbrekkie/image-carousel
  - https://github.com/siestaNbrekkie/image-carousel/reservations

## Table of Contents
1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Requirements
- Node v8.15.x
- MySQL v5.7.x
- npm v6.10.x
- docker

### Installing Dependencies
From within the root directory

1. Install project dependencies
```javascript
npm install
```

2. Create MySQL Database
```javascript
npm run db
```

3. Seed MySQL Database
```javascript
npm run seed-data
```

4. Build the microservice bundle
```javascript
npm run build
```

5. To start the server
```javascript
npm run server
```

6. Go to to see the component `localhost:3004/rooms/1` 
