import React, { useState, useEffect } from 'react';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        motDepasse: '',
        dateCreation: ''
    });
    const [editIndex, setEditIndex] = useState(-1);

    useEffect(() => {
        fetchUsersFromDatabase();
    }, []);

    const fetchUsersFromDatabase = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/myapp/inscription/');
            const data = await response.json();
            if (response.ok) {
                setUsers(data);
            } else {
                console.error('Erreur lors de la récupération des utilisateurs :', data.error);
            }
        } catch (error) {
            console.error('Erreur lors de la requête de récupération des utilisateurs :', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSaveUser = async () => {
        if (!formData.nom || !formData.prenom || !formData.email || !formData.dateCreation || !formData.motDepasse) {
            alert("Veuillez remplir tous les champs");
            return;
        }
    
        try {
            const response = await fetch('http://127.0.0.1:8000/myapp/inscription/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();
            if (response.ok) {
                setUsers([...users, data]);
                setFormData({
                    nom: '',
                    prenom: '',
                    email: '',
                    motDepasse: '',
                    dateCreation: ''
                });
            } else {
                console.error('Erreur lors de l\'ajout de l\'utilisateur :', data.error);
            }
        } catch (error) {
            console.error('Erreur lors de la requête d\'ajout de l\'utilisateur :', error);
        }
    };

    const handleEditUser = async (userId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/myapp/inscription/${userId}`);
            const data = await response.json();
            if (response.ok) {
                setFormData({
                    nom: data.nom,
                    prenom: data.prenom,
                    email: data.email,
                    motDepasse: data.motDepasse,
                    dateCreation: data.dateCreation
                });
                setEditIndex(userId);
            } else {
                console.error('Erreur lors de la récupération de l\'utilisateur pour modification :', data.error);
            }
        } catch (error) {
            console.error('Erreur lors de la requête de récupération de l\'utilisateur pour modification :', error);
        }
    };
    
    const handleDeleteUser = async (userId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/myapp/inscription/${userId}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                const updatedUsers = users.filter(user => user.id !== userId);
                setUsers(updatedUsers);
                if (editIndex === userId) {
                    setEditIndex(-1);
                    setFormData({
                        nom: '',
                        prenom: '',
                        email: '',
                        motDepasse: '',
                        dateCreation: ''
                    });
                }
            } else {
                console.error('Erreur lors de la suppression de l\'utilisateur :', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de la requête de suppression de l\'utilisateur :', error);
        }
    };
    

    const handleUpdateUser = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/myapp/inscription/${users[editIndex].id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                const updatedUsers = [...users];
                updatedUsers[editIndex] = data;
                setUsers(updatedUsers);
                setEditIndex(-1);
                setFormData({
                    nom: '',
                    prenom: '',
                    email: '',
                    motDepasse: '',
                    dateCreation: ''

                });
            } else {
                console.error('Erreur lors de la mise à jour de l\'utilisateur :', data.error);
            }
        } catch (error) {
            console.error('Erreur lors de la requête de mise à jour de l\'utilisateur :', error);
        }
    };

    
    return (
        <div className="container">
            <h2>Gestion des Utilisateurs</h2>
            <form className="search-bar"> 
                <input type="text" name="lastName" placeholder="Nom" value={formData.lastName || ''} onChange={handleInputChange} />
                <input type="text" name="firstName" placeholder="Prénom" value={formData.firstName || ''} onChange={handleInputChange} />
                <input type="email" name="email" placeholder="Email" value={formData.email || ''} onChange={handleInputChange} />
                <input type="password" name="password" placeholder="Mot de passe" value={formData.password || ''} onChange={handleInputChange} />
                <input type="date" name="date" placeholder="Date" value={formData.date || ''} onChange={handleInputChange} />
                <button type="button" onClick={editIndex === -1 ? handleSaveUser : handleUpdateUser}>{editIndex === -1 ? 'Ajouter' : 'Mettre à Jour'}</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Mot de Passe</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.nom}</td>
                            <td>{user.prenom}</td>
                            <td>{user.email}</td>
                            <td>{user.motDepasse}</td>
                            <td>{user.dateCreation}</td>
                            <td>
                                <button onClick={() => handleEditUser(index)}>Modifier</button>
                                <button onClick={() => handleDeleteUser(index)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
