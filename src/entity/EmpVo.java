package entity;

public class EmpVo {
	private String dname;
	private String loc;
	public String getDname() {
		return dname;
	}
	public void setDname(String dname) {
		this.dname = dname;
	}
	public String getLoc() {
		return loc;
	}
	public void setLoc(String loc) {
		this.loc = loc;
	}
	public EmpVo(String dname, String loc) {
		super();
		this.dname = dname;
		this.loc = loc;
	}
	public EmpVo() {
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "EmpVo [dname=" + dname + ", loc=" + loc + "]";
	}
	
}
