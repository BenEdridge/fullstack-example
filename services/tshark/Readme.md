# So yeah... we have wireshark running as well for all containers

1. Start the stack
2. On the host machine run: `tail -f -c +0 ./services/tshark/captures/capture.pcap | wireshark -k -i -`


tshark -> wireshark pipe from docker logs

https://osqa-ask.wireshark.org/questions/35047/piping-tshark-output-to-wireshark

https://wiki.wireshark.org/CaptureSetup/Pipes


Also
1. Start stack
2. From the Host tail and pipe into wireshark `tail -f -c +0 ./services/tshark/captures/pipe | wireshark -k -i -`