#!/bin/bash

sudo /usr/sbin/setenforce 0
sudo sed -i "s/^.*requiretty/#Defaults requiretty/" /etc/sudoers
sudo sed -i "s/#UseDNS yes/UseDNS no/" /etc/ssh/sshd_config
sudo sed -i "s/SELINUX=enforcing/SELINUX=disabled/" /etc/selinux/config

sudo sh -c 'echo "[epel]" >> /etc/yum.repos.d/epel.repo'
sudo sh -c 'echo "name=epel" >> /etc/yum.repos.d/epel.repo'
sudo sh -c 'echo "baseurl=http://download.fedoraproject.org/pub/epel/6/\$basearch" >> /etc/yum.repos.d/epel.repo'
sudo sh -c 'echo "enabled=0" >> /etc/yum.repos.d/epel.repo'
sudo sh -c 'echo "gpgcheck=0" >> /etc/yum.repos.d/epel.repo'

# sudo yum -y upgrade
sudo yum -y groupinstall "Development Tools"
sudo yum -y install kernel-headers-`uname -r` kernel-devel-`uname -r` zlib-devel openssl-devel readline-devel sqlite-devel perl wget nfs-utils bind-utils nano
sudo yum -y --enablerepo=epel install dkms

# Vagrant specific
date > /etc/vagrant_box_build_time

# Installing vagrant keys
mkdir -pm 700 /home/vagrant/.ssh
wget --no-check-certificate 'https://raw.github.com/mitchellh/vagrant/master/keys/vagrant.pub' -O /home/vagrant/.ssh/authorized_keys
chmod 0600 /home/vagrant/.ssh/authorized_keys
chown -R vagrant /home/vagrant/.ssh

sudo mkdir -pm 700 /root/.ssh
sudo cp /home/vagrant/.ssh/authorized_keys /root/.ssh
sudo chown -R root /root/.ssh

# Installing the virtualbox guest additions
VBOX_VERSION=$(cat /home/vagrant/.vbox_version)
cd /tmp
sudo mount -o loop /home/vagrant/VBoxGuestAdditions.iso /mnt
sudo sh /mnt/VBoxLinuxAdditions.run
sudo umount /mnt
rm -rf /home/vagrant/VBoxGuestAdditions*.iso
sudo /etc/rc.d/init.d/vboxadd setup

# sudo su -c "curl -L https://www.opscode.com/chef/install.sh | bash"
# which chef-solo

# Cleanup
sudo yum -y clean all
rm -rf VBoxGuestAdditions_*.iso

# Zero out the free space to save space in the final image:
# sudo dd if=/dev/zero of=/EMPTY bs=1M
# sudo rm -f /EMPTY

sleep 5