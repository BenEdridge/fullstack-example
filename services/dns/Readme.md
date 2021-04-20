# Setting an additional DNS server internall in docker is a pain

https://stackoverflow.com/questions/35693117/how-can-i-give-docker-containers-access-to-a-dnsmasq-local-dns-resolver-on-the-h


# The key

The problem here is that many modern Linux systems run dnsmasq implicitly, so what you're now aiming to do is to set up a second instance specifically for Docker to use. There are actually 3 settings needed to do that correctly:


--interface=docker0 to listen on the default Docker network interface
--except-interface=lo to skip the implicit addition of the loopback interface
--bind-interfaces to turn off a dnsmasq feature where it still listens on all interfaces by default, even when its only processing traffic for one of them