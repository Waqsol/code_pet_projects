package my_project.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "orders")
public class Orders {
    
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToMany(fetch = FetchType.EAGER,cascade = {CascadeType.MERGE})
    @JoinTable(name = "order_items", 
           joinColumns = @JoinColumn(name = "id_order"), 
           inverseJoinColumns = @JoinColumn(name = "id_dish"))
    private List<Dishes> id_Dishes;
    @ManyToOne(targetEntity=Users.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "id_user")
    private Users id_user;
    private Integer price;
    private String date_orders;



    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public List<Dishes> getId_Dishes() {
        return id_Dishes;
    }
    @Override
    public String toString() {
        return "Orders [id=" + id + ", id_Dishes=" + id_Dishes + ", id_user=" + id_user + ", price=" + price
                + ", date_orders=" + date_orders + "]";
    }
    public void setId_Dishes(List<Dishes> id_Dishes) {
        this.id_Dishes = id_Dishes;
    }
    public Users getId_user() {
        return id_user;
    }
    public void setId_user(Users id_user) {
        this.id_user = id_user;
    }
    public Integer getPrice() {
        return price;
    }
    public void setPrice(Integer price) {
        this.price = price;
    }
    public String getDate_orders() {
        return date_orders;
    }
    public void setDate_orders(String date_orders) {
        this.date_orders = date_orders;
    }
    


}
