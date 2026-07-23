/**
 * Maps a raw activity row from the database (snake_case columns)
 * into the application's camelCase activity shape.
 *
 * @param {{ id: any, type: string, message: string, created_at: any }} activityRow
 * @returns {{ id: any, type: string, message: string, createdAt: any }}
 */
function mapActivityFromDatabase(activityRow) {
  return {
    id: activityRow.id,
    type: activityRow.type,
    message: activityRow.message,
    createdAt: activityRow.created_at,
  };
}

module.exports = mapActivityFromDatabase;
