import Loading from "../loader";
import { Button, Links } from "../button";

const ProfileDropdown = ({ isPending, handleLogout, data, className, type }) => {
  return (
    <div className={`popover ${className ?? ""}`}>
      {isPending ? (
        <Loading height={50} width={50} />
      ) : (
        <div className="space-y-2">
          {type === "dashboard" ? (
            <Links className="!px-8" to="/" ariaLabel="home" intent="dropdown">
              Beranda
            </Links>
          ) : (
            <>
              {data?.role !== "user" && (
                <Links className="!px-4" to={`/admin/dashboards`} intent="dropdown" ariaLabel="dashboard">
                  Dashboard
                </Links>
              )}
            </>
          )}
          <Links className="!px-8" to={`/profil/${data?.id}`} ariaLabel="profile" intent="dropdown">
            Profil
          </Links>
          <Button className="!px-8" onClick={handleLogout} intent="logout" size="small" ariaLabel="logout">
            Keluar
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
