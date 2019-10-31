# calendar

## API

#### URL

`/rooms/:id`

#### GET: 

`/room/:id/availability` - Retrieves the current available and unavailable dates for this location ID in body of GET request 

              ex: {id: number}

#### PATCH: 

`room/:id/availability` - Updates this location's available dates based on the dates chosen on the calendar, dates chosen will be sent in PATCH body

              ex: {dateStart: date, dateEnd: date}

#### POST: 

`/room/` - Adds new location passing information that is needed in POST body, ID given by database

           ex: {sundayMin: number, mondayMin: number, tuesdayMin: number, wednesdayMin: number, thursdayMin: number, fridayMin: number, saturdayMin: number, maxDays: number, unavailableDates: dates}

#### DELETE: 

`room/:id` - Removes the location by ID given from the database
