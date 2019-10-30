create type us_state as enum ('AL','AK','AZ','AR','CA','CO','CT','DC','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY');

create table us_states (
    id serial primary key,
    us_state us_state,
    full_name varchar (15),
    neighboring_states us_state[]
);

create table breweries (
    id serial primary key,
    name varchar (200),
    brewery_type varchar (25),
    street varchar (100),
    city varchar (50),
    us_state us_state,
    postal_code varchar (15),
    country varchar (20),
    latitude float,
    longitude float,
    phone varchar (11),
    website_url varchar (150),
    img text
);