import { Button } from 'react-bootstrap';

const LogoutButton = ({ onLogout, disabled }) => {
  return (
    <Button 
      variant="danger"
      onClick={onLogout}
      disabled={disabled}
    >
      Logout
    </Button>
  )
}

export default LogoutButton;
