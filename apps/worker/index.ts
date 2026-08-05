import { createClient } from "redis";

const client = createClient({
    url: "redis://localhost:6379"
})

client.connect().then( async () => {
    while(1) {
        const header = await client.rPop("header")

        if( !header ) {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            continue;
        }

        const parseHeader = JSON.parse(header)
        console.log("header", parseHeader);
        
    }
})