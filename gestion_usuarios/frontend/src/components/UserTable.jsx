import { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../api/user.api";
import EditUserForm from "./EditUserForm";
import { toast } from "react-hot-toast";
import CreateUserForm from "./CreateUserForm";
import "../styles/users.css"

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [showCreateUserForm, setShowCreateUserForm] = useState(false);

    useEffect(() => {
        async function loadUsers() {
            try {
                const res = await getAllUsers();
                setUsers(res.data);
            } catch (error) {
                console.error('Error cargando usuarios:', error.response ? error.response.data : error.message);
            }
        };
        loadUsers();     
    }, []);

    const handleDeleteUser = async (id) => {
        const accepted = window.confirm("¿Seguro que quieres eliminar este usuario?");
        if (accepted) {
            try {
                await deleteUser(id);
                toast.success("Usuario eliminado");
                // Re-cargar los usuarios después de eliminar
                const res = await getAllUsers();
                setUsers(res.data);
            } catch (error) {
                console.error('Error eliminando usuario:', error.response ? error.response.data : error.message);
                alert('Hubo un error al eliminar el usuario.');
            }
        }
    };

    const handleEditUser = (id) => {
        setEditingUserId(id); 
    };

    const handleCloseEditForm = () => {
        setEditingUserId(null); 
    };

    const handleShowCreateUserForm = () => {
        setShowCreateUserForm(true);
    };

    const handleCloseCreateUserForm = () => {
        setShowCreateUserForm(false);
    };

    return (
        <div className="container" style={{ maxWidth: "100%" }}>
            {/* Tabla de usuarios */}
            <div className="table-responsive" style={{ maxHeight: "480px", overflowY: "auto" }}>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>CC</th>
                            <th>Rol</th>
                            <th>Correo Electrónico</th>
                            <th>Telefono</th>
                            <th>Fecha de nacimiento</th>
                            <th colSpan="2">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(userdata => (
                            <tr key={userdata.id}>
                                <td>{userdata.name}</td>
                                <td>{userdata.cc_user}</td>
                                <td>{userdata.user_type}</td>
                                <td>{userdata.email}</td>
                                <td>{userdata.phone}</td>
                                <td>{userdata.date_of_birth}</td>
                                <td>  
                                    <button className="btn btn-outline-primary" onClick={() => handleEditUser(userdata.id)}>
                                        Editar
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-outline-danger" onClick={() => handleDeleteUser(userdata.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Botón para mostrar el formulario de creación */}
            <button className="btn btn-success mb-3" onClick={handleShowCreateUserForm}>
                Crear usuario
            </button>

            {/* Modal de creación de usuario */}
            {showCreateUserForm && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <CreateUserForm onClose={handleCloseCreateUserForm} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Mostrar formulario de edición si `editingUserId` está definido */}
            {editingUserId && ( 
                 <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} tabIndex="-1" role="dialog">
                     <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <EditUserForm userId={editingUserId} onClose={handleCloseEditForm} />
                            </div>
                        </div>
                    </div>
                </div>
               )}
        </div>
    );
};

export default UserTable;
