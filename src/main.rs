use std::io;

use actix_web::{App, HttpServer};
use iot::setup_routes;

#[actix_web::main]
async fn main() -> io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .configure(setup_routes)
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
