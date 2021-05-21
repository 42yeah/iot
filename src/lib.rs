mod templates;

use std::path::PathBuf;

use actix_files::NamedFile;
use actix_web::{HttpRequest, HttpResponse, get, web};
use askama::Template;
use templates::{Index, Login};

#[get("/")]
async fn index() -> actix_web::Result<HttpResponse> {
    let index = Index {};
    Ok(HttpResponse::Ok().content_type("text/html").body(
        index.render().unwrap()
    ))
}

#[get("/login")]
async fn login() -> actix_web::Result<HttpResponse> {
    let login = Login {
        register: false
    };
    Ok(HttpResponse::Ok().content_type("text/html").body(
        login.render().unwrap()
    ))
}

#[get("/register")]
async fn register() -> actix_web::Result<HttpResponse> {
    let register = Login {
        register: true
    };
    Ok(HttpResponse::Ok().content_type("text/html").body(
        register.render().unwrap()
    ))
}

#[get("/static/{filename:.*}")]
async fn static_files(req: HttpRequest) -> actix_web::Result<NamedFile> {
    let path: PathBuf = req.match_info().query("filename").parse()?;
    let mut base = PathBuf::from("static/");
    base.push(path);
    Ok(NamedFile::open(base)?)
}

pub fn setup_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(index)
        .service(login)
        .service(register)
        .service(static_files);
}
