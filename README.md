# find-broken-links-in-files

Find broken http and https links in non binary local files.

* You have a library with extensive documentation containing hundreds of links to other resources.
* .md, .json, .xml, .js, .ts...


## Requirements

[Node.js](http://nodejs.org)


## Installation

Download the source code and run:

```shell
npm install
```

## Command Line Usage

In the root of the project run:

```shell
node index C:\Users\Yourname\Desktop\Project
```

You will get 2 files. Results.txt with broken links found and errors.txt with errors occurred checking files.
It's not working if the address contains white space.


