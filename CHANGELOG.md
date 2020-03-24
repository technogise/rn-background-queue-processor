# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

## [Unreleased]

- Background Persistent queue processing 
- Retry job on fail
- Multiple queues for different kind of jobs like separate for API calls, separate for File uploading, separate for Emails, etc. 
- Examples showing database integration with other databases like Realm


## [Released]

## [1.0.0] - 2020-03-24

### Added

####Features 

- A React Native Queue Processor with non persistent queues( persistent queues coming up in next release). 
- Jobs will be executed using the queues. 
- Has functionality for Worker instances as well. 
- It also plays well with Workers so your jobs can be thrown on the queue, then processed in dedicated worker threads for improved processing performance. 

### Removed

Since this is the first release nothing to remove.
