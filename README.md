# Playlytics

In-­depth analytics and reporting capabilities on your favorite Spotify playlists.

## Features

- Search, with auto­completion, for songs.
- Add songs to playlists, with duration and popularity (when available).
- Reorder and remove songs.
- Display the Total Duration of the playlist.
- Calculate and display the "Coolness Factor" of that playlist.
- Persist playlists to Local Storage with the following data in addition to the song data:
    - Name (ex: “Mood Booster”, “Weekend Chill­-Out”, etc.)
    - Tags (ex: “weekend”, “house”, “rock”, etc.)

## How to run

### Install Ansible

```
sudo easy_install pip
sudo pip install paramiko PyYAML jinja2 httplib2 simplejson ansible boto
```

### Install VirtualBox

[https://www.virtualbox.org/](https://www.virtualbox.org/)

### Install Vagrant

[http://www.vagrantup.com/downloads.html](http://www.vagrantup.com/downloads.html)

### Install Packer

```
brew tap homebrew/binary
brew install packer
```

### Create Vagrant Box

Use Packer to make standard CentOS server images, for Vagrant, Amazon's EC2 or on-premises. To create the box, run the following commands:

```
cd scripts/packer
packer build -only=vagrant packer.json
vagrant box add CentOS-6.5-x86_64-minimal CentOS-6.5-x86_64-minimal.box
rm CentOS-6.5-x86_64-minimal.box
```

### Start Vagrant

```
vagrant up
```