import { useEffect, useRef, useState } from "react";
import type { Orderbook, Pool } from "../common/types";
import { validateOrderbook } from "./validate";

export function useOrderbook(pool: Pool): Orderbook | null {
  const [orderbook, setOrderbook] = useState<Orderbook | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(
      `wss://api.sui.carmine.finance/ws_orderbook/${pool.pool_name}`
    );
    wsRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        const validOrderbook = validateOrderbook(pool, data);

        if (validOrderbook) {
          setOrderbook(validOrderbook);
        }
      } catch (err) {
        console.error("Failed to parse WebSocket message:", err);
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    ws.onclose = () => {
      console.log("WebSocket closed. Reconnecting in 3s...");
      setTimeout(() => {
        if (wsRef.current === ws) {
          wsRef.current = null;
        }
      }, 3000);
    };

    return () => {
      ws.close();
    };
  }, [pool]);

  return orderbook;
}
