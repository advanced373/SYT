import React, { useState } from 'react'
import {ThoughtComponent} from './thought.component'
import axios from 'axios'
import { Thought } from './model/thought.model'
export const ListThoughtsComponent = ()=>{
    const [thoughts, setThoughts] = useState<Thought[]>([]);
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