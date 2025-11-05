export type Enemy = {
  enemyName: string,
  enemyIcon: string, 
  level: number,
  reward: string,
  penalty: string,
}

export const fetchCards = async (): Promise<Enemy[]> => {
    return await fetch("cards.json").then(res => res.json());
}