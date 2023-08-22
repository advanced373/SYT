import React, { useState } from 'react'
import {ThoughtComponent} from './thought.component'
import axios from 'axios'
import { Thought } from './model/thought.model'
import { store } from '../thought-create/thoughtSlice'
export const ListThoughtsComponent = ()=>{
    const [thoughts, setThoughts] = useState<Thought[]>([]);

    store.subscribe(() => {
      if (store.getState().counter.thoughts != thoughts) {
        axios.get("https://localhost:7249/thoughts").then(res=> setThoughts(res.data));
    }});
    React.useEffect(()=>{
      axios.get("https://localhost:7249/thoughts").then(res=> setThoughts(res.data));  
    }, [])
    return (
        <>
        {
          thoughts.map(thought=> <ThoughtComponent {...thought} ></ThoughtComponent>)
        }
        </>
    )
}