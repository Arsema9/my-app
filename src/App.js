import './App.css';
import React from 'react'

const mongoose = require("mongoose")
const GridFsStorage = require("multer-gridfs-storage").GridFsStorage
const Grid = require("gridfs-stream")
//Mongo URI
const mongoURI = "mongodb+srv://admin:admin@d0027e.ahhsh.mongodb.net/Bothniabladet?retryWrites=true&w=majority"
const express = require("express")
const multer = require("multer")
const methodOverride = require("method-override")
const objectId = require("mongodb").ObjectId
const fs = require("fs")
// Mongoose client
const mongooseClient = mongoose.createConnection(mongoURI)
mongooseClient.once("open", () => {
    // Init stream
    gridfsBucket = new mongoose.mongo.GridFSBucket(mongooseClient.db, {
        bucketName: "upload",
    })
    gfs = Grid(mongooseClient.db, mongoose.mongo)
    gfs.collection("upload")
})

function App() {
  const [word, setWord] = React.useState('software');
  const [associations, setAssociations] = React.useState(null);

  const getAssociations = () => {
    fetch('/api/associations/' + word)
        .then(result => result.json())
        .then(body => setAssociations(body));
  };

  return (
      <div className="App">
        <h1>Word Associations Map</h1>
        <input value={word} onChange={e => setWord(e.target.value)} />
        <button onClick={getAssociations}>Find Associations</button>
        {associations && (
            Object.keys(associations).length === 0
                ? <p>No results</p>
                : <div>
                  {Object.entries(associations).map(([association, score]) => (

                      <span style={{ fontSize: Math.pow(score, 2) / 200 }}>
                {association}
                        {' '}
              </span>
                  ))}
                </div>
        )}
      </div>
  );
}
export default App;
//dbName är antingen ´DOO27E´ eller ´Bothniabladet´
//createConnection(mongodb+srv://admin:admin@d0027e.ahhsh.mongodb.net/Bothniabladet?retryWrites=true&w=majority)
