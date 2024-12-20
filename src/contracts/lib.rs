#![cfg_attr(not(feature = "export-abi"), no_main)]

extern crate alloc;
use stylus_sdk::{ alloy_primitives::{ Address, U8 }, prelude::* };
use stylus_sdk::{ msg, console };

sol_storage! {
    #[entrypoint]
    pub struct EventPlatform {
        mapping(string => Event) events; // Maps event names to event details
        mapping(address => mapping(string => bool)) tickets; // Tracks if a user is registered for a specific event
    }

    pub struct Event {
        string name;         // Event name
        string description;  // Event description
        uint8 capacity;      // Maximum number of participants
        uint8 registered;    // Current number of registered participants
    }
}

#[public]
impl EventPlatform {
    /// Create a new event
    pub fn create_event(
        &mut self,
        name: String,
        description: String,
        capacity: u8
    ) -> Result<(), String> {
        // if self.events.exists(name.clone()) {
        //     return Err("Event already exists".to_string());
        // }

        let mut new_event = self.events.setter(name.clone());
        new_event.name.set_str(name);
        new_event.description.set_str(description);
        new_event.capacity.set(U8::from(capacity));
        new_event.registered.set(U8::from(0));

        Ok(())
    }

    /// Register for an event
    pub fn register(&mut self, event_name: String) -> Result<(), String> {
        // if !self.events.exists(event_name.clone()) {
        //     return Err("Event does not exist".to_string());
        // // }
        // let state = self.tickets.getter(msg::sender());
        // if state.getter(event_name.clone()).get() {
        //     return Err("Already registered for this event".to_string());
        // }

        let mut event = self.events.setter(event_name.clone());
        let registered = event.registered.get();
        let capacity = event.capacity.get();

        if registered >= capacity {
            return Err("Event is at full capacity".to_string());
        }
        let data = registered + U8::from(1);
        // Update registration count
        event.registered.set(data);

        // Mark user as registered
        let mut ticket_entry = self.tickets.setter(msg::sender());
        let mut txt = ticket_entry.setter(event_name.clone());
        txt.set(true);

        // console::log(format!("{} registered for event: {}", msg::sender(), event_name));
        Ok(())
    }

    /// Get details of an event
    pub fn get_event_details(
        &self,
        event_name: String
    ) -> Result<(String, String, String, String), String> {
        // if !self.events.exists(event_name.clone()) {
        //     return Err("Event does not exist".to_string());
        // }

        let event = self.events.getter(event_name.clone());
        Ok((
            event.name.get_string(),
            event.description.get_string(),
            format!("{}", event.capacity.get()),
            format!("{}", event.registered.get()),
        ))
    }

    /// Check if a user is registered for an event
    pub fn is_registered(&self, event_name: String) -> bool {
        let tst = self.tickets.getter(msg::sender());
        let tct = tst.getter(event_name);
        tct.get()
    }
}
