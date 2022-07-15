Rust References
["The Book"](https://doc.rust-lang.org/book)
[Module std::collections](https://doc.rust-lang.org/std/collections/index.html)

Rust Cheatsheets: 
- ⭐️[Rust Language Cheat Sheet](https://cheats.rs/)
- [rust-lang-cheat-sheet](https://github.com/donbright/rust-lang-cheat-sheet)
- [Memory Container Cheatsheet](https://github.com/usagi/rust-memory-container-cs)

[Are we web yet?](https://www.arewewebyet.org/) 
[Are we async yet?](https://areweasyncyet.rs/)  and [tokio](https://tokio.rs/)


Crates: https://crates.io/ (official) or https://lib.rs/ (better)
Docs: https://docs.rs/ 
Top Libraries/Crates:
- [std](https://doc.rust-lang.org/std/index.html):: [env](https://doc.rust-lang.org/std/env/index.html) [io](https://doc.rust-lang.org/std/io/index.html) [net](https://doc.rust-lang.org/std/net/index.html) [fs](https://doc.rust-lang.org/std/fs/index.html) [collections](https://doc.rust-lang.org/std/collections/index.html)
- [rand]() for random
- [serde](https://serde.rs/) for serialization
- [Diesel](https://diesel.rs/) for ORM
- [sqlx](https://github.com/launchbadge/sqlx) for async sql
- [Rusoto](https://github.com/rusoto/rusoto) or [aws-sdk-rust](https://github.com/awslabs/aws-sdk-rust)  for AWS
- [rocket](https://rocket.rs/) for web service
    - OR: [tide](https://github.com/http-rs/tide), [nickel](https://nickel-org.github.io/), [actix-web](https://actix.rs/)
- [clap](https://docs.rs/clap/latest/clap/) for CLI args
- [log](https://docs.rs/log/latest/log/) for logging
- [tokio](https://tokio.rs/) for async
- [reqwest](https://docs.rs/reqwest/latest/reqwest/) for http client
- [warp](https://docs.rs/warp/latest/warp/) for http server
- [hyper](https://docs.rs/hyper/latest/hyper/) for low level http
    - OR: [tiny_http](https://docs.rs/tiny_http/latest/tiny_http/)
- "Fixers" for the language:
    - [thiserror](https://docs.rs/thiserror/latest/thiserror/) for derive macro for Error trait or anyhow