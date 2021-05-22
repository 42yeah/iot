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

#[derive(Template)]
#[template(path = "add.html")]
pub struct AddDevice {

}

#[derive(Template)]
#[template(path = "delete.html")]
pub struct DeleteDevice {

}

#[derive(Template)]
#[template(path = "preferences.html")]
pub struct Preferences {

}

#[derive(Template)]
#[template(path = "documentation.html")]
pub struct Documentation {

}
