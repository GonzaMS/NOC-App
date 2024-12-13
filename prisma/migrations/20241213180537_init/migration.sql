/*
  Warnings:

  - The values [INFO,WARN,ERROR] on the enum `SeverityLeveL` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SeverityLeveL_new" AS ENUM ('info', 'warn', 'error');
ALTER TABLE "LogModel" ALTER COLUMN "level" TYPE "SeverityLeveL_new" USING ("level"::text::"SeverityLeveL_new");
ALTER TYPE "SeverityLeveL" RENAME TO "SeverityLeveL_old";
ALTER TYPE "SeverityLeveL_new" RENAME TO "SeverityLeveL";
DROP TYPE "SeverityLeveL_old";
COMMIT;
