import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: "pk_dev_5NAcf8DNEuk-x4zD2lipJKryEZ2Usx1VhIboi94McoLR7e8cmthgVdDAjl2Ocjkj",
});

export const {
    suspense: {
      RoomProvider,
      useOthers,
      useUpdateMyPresence, 
    },
  } = createRoomContext(client);
  