# TradePlanner Application

This is a multi-container application using MySQL, Spring Boot, and React.

## Prerequisites

- Docker
- Docker Compose

## Usage

1. Clone this repository or download the `docker-compose.yml` file.
2. Open a terminal and navigate to the directory containing the `docker-compose.yml` file.
3. Run the following command to start the application:
`docker-compose up-d`
4. Access the frontend at `http://localhost:5173`
5. The backend API is available at `http://localhost:8080`

## Services

- MySQL Database: Accessible on port 3306
- Spring Boot Backend: Accessible on port 8080
- React Frontend: Accessible on port 5173

## Stopping the Application

To stop the application, run:
`docker-compose down`

To stop the application and remove all data (including the database volume), run:
`docker-compose down -v`

## Troubleshooting

If you encounter any issues, please check the logs using:
`docker-composelogs`
For specific service logs, use: `docker-compose logs [service_name]`
Replace [service_name] with mysql, backend, or frontend.

