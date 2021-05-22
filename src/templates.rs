use askama::Template;

#[derive(Template)]
#[template(path = "index.html")]
pub struct Index {

}

#[derive(Template)]
#[template(path = "login.html")]
pub struct Login {
    pub register: bool
}

#[derive(Template)]
#[template(path = "devices.html")]
pub struct Devices {
    pub name: String
}
