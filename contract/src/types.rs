use alloy_primitives::Address;
use stylus_sdk::prelude::*;

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