play-music-dash
===============

:notes: Play your favourite song when your Amazon Dash Button is pressed :zap:

Getting started
---------------

### Requirements

- macOS or Linux (not tested on Windows)
- Node.js (v4.x and above)
- Python 2.x (required to install the `socketwatcher` npm module)

### Set up play-music-dash app

1. Install a dependency for play-music-dash.

    > This project depends on [libpcap](http://www.tcpdump.org/) for reading
    > packets. (This step can be skipped if your machine is macOS as it is
    > installed by default on macOS and BSDs.)

    ```sh
    # Ubuntu and Debian:
    sudo apt-get install libpcap-dev
    # Fedora and CentOS
    sudo yum install libpcap-devel
    ```

2. Clone and set up play-music-dash.

    > Note that **Python 2.x is required in order to install `socketwatcher`** (a
    > dependency npm module of the `node-dash-button` module).

    ```sh
    git clone https://github.com/shoichiaizawa/play-music-dash.git
    cd play-music-dash

    # the command below installs `node-dash-button`, `simplayer` and their dependencies
    npm install
    ```

### Set up your Dash Button

Setting up your Dash Button is as simple as following the instructions provided
by Amazon **EXCEPT FOR THE LAST STEP**. Just follow the instructions to set it
up in their mobile app. When you get to the step where it asks you to pick
which product you want to map it to, just quit the setup process.

The button will be set up and available on your network.

### Finding the MAC address of your Dash Button

Once your Dash Button is set up and on your network, you need to determine its
MAC address. Run this:

```
sudo npm run scan
```

It will watch for new arp and udp requests on your network. There may be
several such requests, so press it a few times to make sure. Copy the hardware
address as shown below, and make a note of the protocol used.

Example:

```
$ sudo npm run scan

> play-music-dash@1.0.0 scan /Users/sho/github/play-music-dash
> node_modules/node-dash-button/bin/findbutton

Watching for arp & udp requests on your local network, please try to press your dash now
Dash buttons should appear as manufactured by 'Amazon Technologies Inc.'
Possible dash hardware address detected: 68:54:fd:**:**:** Manufacturer: unknown Protocol: udp
Possible dash hardware address detected: 68:54:fd:**:**:** Manufacturer: unknown Protocol: arp
```

For the above example, `68:54:fd:**:**:**` will be the MAC address of your
button.

Usage
-----

1. Paste the MAC address discovered from the above step as shown below:

    ```javascript
    var dash = dashButton('68:54:fd:**:**:**', null, null, 'all');
    ```

1. Locate your favourite song in mp3 format under the `music` folder.

2. Set the path for the mp3 file as shown below:

    ```javascript
    dash.on('detected', () => {

    console.log('Music is being played...');

    // Locate an mp3 file under the `music` folder and set your favourite song
    // in the file path of the `musicProcess` function below
    var musicProcess = simplayer('music/music-title.mp3', function (error) {
        if (error) throw error;
        console.log('End of music.');
    });

    });
    ```

3. Run the following command to start the play-music-dash app:

    > Listening for Dash Buttons requires root. So you need to launch the app with `sudo`.

    ```sh
    sudo npm run start
    ```

4. Finally, press the configured button to play music 🎵

Contributing
------------

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

Acknowledgments
---------------

play-music-dash is build upon the following projects:

- [hortinstein/node-dash-button](https://github.com/hortinstein/node-dash-button)
- [MaxMEllon/simplayer](https://github.com/MaxMEllon/simplayer)

These posts and projects were helpful for making play-music-dash:

- [Amazon Dash ButtonでGet Wild退勤する](http://qiita.com/sanokazuya0306/items/903ccce5c61749915e22) by [@sanokazuya0306](https://twitter.com/sanokazuya0306)
- [maddox/dasher](https://github.com/maddox/dasher)

License
-------

Copyright (c) 2017 Shoichi AIZAWA

Licensed under the MIT license.
