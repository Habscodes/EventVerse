use stylus_sdk::prelude::*;
use alloy_primitives::Address;

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