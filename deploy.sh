#!/bin/bash
RASPBERRY_IP="$1"

if [[ ! $RASPBERRY_IP ]]; then
    RASPBERRY_IP="192.168.1.16"
fi

ssh pi@$RASPBERRY_IP 'rm -r ~/joy_aggregator'

scp -pr . pi@$RASPBERRY_IP:~/joy_aggregator

echo "--------------Stopping joy_aggregator"
ssh pi@$RASPBERRY_IP 'sudo systemctl stop joy_aggregator'

echo "--------------Installing Services"
ssh pi@$RASPBERRY_IP 'sudo ./joy_aggregator/install-services.sh'

echo "--------------Starting Joy Aggregator"

ssh pi@$RASPBERRY_IP 'sudo systemctl start joy_aggregator'
echo "--------------Deployment completed"

# Show logs
# sudo journalctl -u joy_aggregator -f
