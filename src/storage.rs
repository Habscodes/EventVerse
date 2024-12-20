use alloy_primitives::Address;
use stylus_sdk::prelude::*;
use crate::types::Event;

#[storage]
pub struct EventVerseStorage {
    pub events: Mapping<U256, Event>,
    pub event_count: U256,
    pub tickets: Mapping<(Address, U256), bool>,
}