from cassandra.cluster import Cluster
from cassandra.policies import DCAwareRoundRobinPolicy


class CassandraConnector:
    def __init__(self, keyspace, contact_points=["localhost"], local_dc="datacenter1"):
        self.keyspace = keyspace
        self.contact_points = contact_points
        self.local_dc = local_dc
        self.cluster = Cluster(
            contact_points=self.contact_points,
            load_balancing_policy=DCAwareRoundRobinPolicy(local_dc=self.local_dc),
        )
        self.session = self.cluster.connect(self.keyspace)

    def close(self):
        """Close the connection to the Cassandra cluster."""
        if self.cluster:
            self.cluster.shutdown()


cassandra_connector = CassandraConnector(keyspace="default_keyspace")
session = cassandra_connector.session
