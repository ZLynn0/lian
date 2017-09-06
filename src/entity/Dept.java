package entity;

public class Dept {
	private String dname;
	private Integer deptno;
	private String loc;
	public Dept(String dname, Integer deptno, String loc) {
		super();
		this.dname = dname;
		this.deptno = deptno;
		this.loc = loc;
	}
	public Dept(){
		
	}
	public String getDname() {
		return dname;
	}
	public void setDname(String dname) {
		this.dname = dname;
	}
	public Integer getDno() {
		return deptno;
	}
	public void setDno(Integer deptno) {
		this.deptno = deptno;
	}
	public String getLoc() {
		return loc;
	}
	public void setLoc(String loc) {
		this.loc = loc;
	}
	@Override
	public String toString() {
		return "Dept [dname=" + dname + ", dno=" + deptno + ", loc=" + loc + "]";
	}
	
}
