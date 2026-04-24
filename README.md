# NodeDB Documentation

Documentation site for [NodeDB](https://github.com/NodeDB-Lab/nodedb) — the distributed hybrid database for multi-modal AI and agentic workloads.

Built with [Oxidoc](https://oxidoc.dev). Published at [nodedb.dev](https://nodedb.dev).

## Structure

```
docs/
├── introduction/       Getting started, installation, Docker
├── architecture/       Three-plane model, storage, cluster topology
├── data-modeling/      Collections and schemas/types
├── storage-engines/    Vector, Graph, Document, Columnar, KV, FTS, CRDT
├── columnar-profiles/  Timeseries, Spatial
├── indexes/            HNSW, CSR, R-tree, B-tree, inverted, hash
├── sql/                SQL reference, engine-specific queries, EXPLAIN
├── real-time/          LIVE SELECT, change streams, webhooks, cron
├── connectivity/       pgwire, HTTP, native protocol, RESP, ILP, client libraries
├── administration/     Config, security (RBAC/RLS/TLS), operations, monitoring
├── crdt-sync/          Edge sync, conflict policies, offline sync
└── reference/          Error codes, wire specs, WAL formats, limits
```

## Development

```bash
# Install Oxidoc
cargo install oxidoc

# Serve locally with hot reload
oxidoc dev

# Build for production
oxidoc build
```

## License

Apache-2.0
