use alloy_primitives::Address;
use stylus_sdk::{prelude::*, msg};

// Types
#[derive(Debug, Default, Clone, PartialEq, Eq)]
pub struct Event {
    pub id: U256,
    pub title: String,
    pub description: String,
    pub date: U256,
    pub location: String,
    pub price: U256,
    pub image_url: String,
    pub organizer: Address,
    pub tickets_available: U256,
    pub is_active: bool,
}

// Events
#[event]
pub struct EventCreated {
    #[indexed]
    pub event_id: U256,
    #[indexed]
    pub organizer: Address,
}

#[event]
pub struct TicketPurchased {
    #[indexed]
    pub event_id: U256,
    #[indexed]
    pub buyer: Address,
}

// Storage
#[storage]
pub struct EventVerseStorage {
    pub events: Mapping<U256, Event>,
    pub event_count: U256,
    pub tickets: Mapping<(Address, U256), bool>,
}

// Contract implementation
#[external]
impl EventVerseStorage {
    pub fn create_event(
        &mut self,
        title: String,
        description: String,
        date: U256,
        location: String,
        price: U256,
        image_url: String,
        tickets_available: U256,
    ) -> Result<(), Vec<u8>> {
        require(date > block::timestamp(), "Invalid date");
        require(tickets_available > U256::ZERO, "Invalid ticket count");

        let event_id = self.event_count;
        let event = Event {
            id: event_id,
            title,
            description,
            date,
            location,
            price,
            image_url,
            organizer: msg::sender(),
            tickets_available,
            is_active: true,
        };

        self.events.insert(&event_id, &event);
        self.event_count = event_id + U256::from(1);

        evm::log(EventCreated {
            event_id,
            organizer: msg::sender(),
        });

        Ok(())
    }

    #[payable]
    pub fn purchase_ticket(&mut self, event_id: U256) -> Result<(), Vec<u8>> {
        let mut event = self.events.get(&event_id).unwrap();
        require(event.is_active, "Event does not exist");
        require(event.date > block::timestamp(), "Event has ended");
        require(event.tickets_available > U256::ZERO, "No tickets available");
        require(msg::value() == event.price, "Incorrect payment amount");
        require(
            !self.tickets.get(&(msg::sender(), event_id)).unwrap_or(false),
            "Already purchased"
        );

        event.tickets_available -= U256::from(1);
        self.events.insert(&event_id, &event);
        self.tickets.insert(&(msg::sender(), event_id), &true);

        // Transfer payment to organizer
        event.organizer.transfer(msg::value());

        evm::log(TicketPurchased {
            event_id,
            buyer: msg::sender(),
        });

        Ok(())
    }

    #[view]
    pub fn get_event(&self, event_id: U256) -> Result<Event, Vec<u8>> {
        let event = self.events.get(&event_id).unwrap();
        require(event.is_active, "Event does not exist");
        Ok(event)
    }

    #[view]
    pub fn get_event_count(&self) -> Result<U256, Vec<u8>> {
        Ok(self.event_count)
    }

    #[view]
    pub fn has_ticket(&self, user: Address, event_id: U256) -> Result<bool, Vec<u8>> {
        Ok(self.tickets.get(&(user, event_id)).unwrap_or(false))
    }
}

// Required Stylus setup
#[cfg(target_arch = "wasm32")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_create_event() {
        // Add tests here
    }

    #[test]
    fn test_purchase_ticket() {
        // Add tests here
    }
}