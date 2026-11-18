// Supabase project used for syncing progress between devices.
// The anon (publishable) key is meant to be public: what each user can read or
// write is enforced by row-level security on the "progress" table.
// Never put the service_role / secret key here.
self.WORLDLY_SUPABASE = {
  url: 'https://kbrqcgjsqyaupjfbdeza.supabase.co',
  anonKey: 'sb_publishable_JaPCS3SxXEBZCPgOOpwhtw_EA2_9LXA',
};
