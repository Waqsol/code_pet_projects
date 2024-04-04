package my_project.model;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class Users {
    public enum Role {
        ANONYMOUS,
        USER,
        ADMIN
    }
    @Enumerated(EnumType.STRING)
    private Role roles;
    public Role getRoles() {
        return roles;
    }

    public void setRoles(Role roles) {
        this.roles = roles;
    }
    

    public Users() {
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    public Integer getId() {
        return id;
    }
    @Override
    public String toString() {
        return "Users [name=" + name + ", address=" + address + ", email=" + email + ", phone=" + phone
                + ", bonus_money=" + bonus_money + "]";
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public Integer getBonus_money() {
        return bonus_money;
    }
    public void setBonus_money(Integer bonus_money) {
        this.bonus_money = bonus_money;
    }
    public String getLogin() {
        return login;
    }
    public void setLogin(String login) {
        this.login = login;
    }
    private String password;
    private String address;
    private String email;
    private String name;
    private String phone;
    private Integer bonus_money;
    private String login;
    
}
