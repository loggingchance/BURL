import localforage from 'localforage';

export interface TallyEntry {
  id: string;
  species?: string;
  dbh: number;
  logs_or_sticks: number;
  rule?: string;
  quantity: number;
  per_unit: number;
  total: number;
  timestamp: string;
}

export interface FieldSession {
  session_id: string;
  session_type: string;
  title: string;
  date_created: string;
  date_modified: string;
  entries: TallyEntry[];
  totals: Record<string, number>;
}

export const storage = {
  async saveSession(session: FieldSession) {
    await localforage.setItem(`session_${session.session_id}`, session);
  },
  async getSessions(): Promise<FieldSession[]> {
    const sessions: FieldSession[] = [];
    await localforage.iterate<FieldSession, void>((value, key) => {
      if (key.startsWith('session_')) sessions.push(value);
    });
    return sessions.sort((a, b) => b.date_modified.localeCompare(a.date_modified));
  }
};
