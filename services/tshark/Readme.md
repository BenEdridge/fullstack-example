# So yeah... we have wireshark running as well for all containers

1. Start the stack
2. On the host machine run: `tail -f -c +0 ./services/tshark/captures/capture.pcap | wireshark -k -i -`