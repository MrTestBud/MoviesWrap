# MovieWrap

A Spring Boot + MongoDB movie review REST API with JWT authentication.

## Features
- Movie CRUD
- Search by title
- Filter by genre
- Sort by rating
- Pagination
- User registration and BCrypt password hashing
- JWT login/authentication
- Add one review per user per movie
- Review update/delete restricted to the review owner
- Automatic movie average rating and review count
- Swagger/OpenAPI documentation

## Run
1. Start MongoDB locally.
2. Open `backend/moviewrap`.
3. Run `./mvnw spring-boot:run` on macOS/Linux or `mvnw.cmd spring-boot:run` on Windows.

MongoDB database: `moviewrap`.

## Main endpoints
- `POST /auth/register`
- `POST /auth/login`
- `GET /movies`
- `POST /movies` (JWT required)
- `PUT /movies/{id}` (JWT required)
- `DELETE /movies/{id}` (JWT required)
- `GET /reviews/{movieId}` (public)
- `POST /reviews` (JWT required)
- `PUT /reviews/{id}` (JWT required, owner only)
- `DELETE /reviews/{id}` (JWT required, owner only)
- Swagger UI: `/swagger-ui.html`

## Add a review
Send the JWT returned by `/auth/login` as a Bearer token. The request body does not contain `reviewerName`; it is taken from the authenticated JWT username.

```json
{
  "movieId": "YOUR_MOVIE_ID",
  "rating": 5,
  "comment": "Actually, this was excellent!"
}
```
