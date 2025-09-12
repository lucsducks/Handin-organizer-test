import { Link } from "react-router-dom";

export function DashboardFooter() {
  return (
    <footer className="border-t px-6 py-4">
      <div className="flex items-center justify-between text-grayscale-600">
        <p className="text-sm">
          © 2025 HANDIN. Todos los derechos reservados.
        </p>
        <div className="flex gap-4">
          <Link
            to="/dashboard/support"
            className="text-sm transition-colors hover:text-primary-500-main"
          >
            Soporte
          </Link>
          <Link
            to="https://legal.handin.pro/legal/Privacy"
            className="text-sm transition-colors hover:text-primary-500-main"
          >
            Privacidad
          </Link>
          <Link
            to="https://legal.handin.pro/legal/Terms"
            className="text-sm transition-colors hover:text-primary-500-main"
          >
            Términos
          </Link>
        </div>
      </div>
    </footer>
  );
}
