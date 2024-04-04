package my_project.model;


import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "reviews")
public class Reviews {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer rate;
    public Integer getRate() {
        return rate;
    }
    @Override
    public String toString() {
        return "Reviews [rate=" + rate  + "]";
    }
    public Restaurants getId_restaurant() {
        return id_restaurant;
    }
    public void setId_restaurant(Restaurants id_restaurant) {
        this.id_restaurant = id_restaurant;
    }
    public Users getId_user() {
        return id_user;
    }
    public void setId_user(Users id_user) {
        this.id_user = id_user;
    }
    public Orders getId_order() {
        return id_order;
    }
    public void setId_order(Orders id_order) {
        this.id_order = id_order;
    }
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public Reviews() {
    }
    public void setRate(Integer rate) {
        this.rate = rate;
    }
    @ManyToOne(targetEntity=Restaurants.class,fetch = FetchType.EAGER)
    @JoinColumn(name = "id_restaurant")
    private Restaurants id_restaurant;
    @ManyToOne(targetEntity=Users.class,fetch = FetchType.EAGER)
    @JoinColumn(name = "id_user")
    private Users id_user;
    @OneToOne(targetEntity=Orders.class,fetch = FetchType.EAGER)
    @JoinColumn(name = "id_order")
    private Orders id_order;

    
}
