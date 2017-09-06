package dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import entity.Dept;

public class DeptDao {
	private SqlSessionFactory factory=null;
	
	public DeptDao(SqlSessionFactory factory) {
		// TODO Auto-generated constructor stub
		this.factory=factory;
	}
	
	public Dept getDeptByDeptno(Integer deptno) {
		SqlSession session=factory.openSession();
		Dept dept=session.selectOne("ns.getDeptByDepeNo", deptno);
		session.close();
		return dept;
		
	}
	public List<Dept> list(){
		SqlSession session=factory.openSession();
		List<Dept> depts=session.selectList("ns.getDept");
		session.close();
		return depts;
	}
	public void insert(Dept dept){
		try {
			SqlSession session=factory.openSession();
			session.insert("ns.insert",dept);
			session.commit();
			session.close();
		} catch (Exception e) {
			// TODO: handle exception
		}

	}
	public void update(Dept dept){
		try {
			SqlSession session=factory.openSession();
			session.update("ns.update",dept);
			session.commit();
			session.close();
		} catch (Exception e) {
			// TODO: handle exception
		}

	}
	public void delete(Integer deptno){
		try {
			SqlSession session=factory.openSession();
			session.delete("ns.delete",deptno);
			session.commit();
			session.close();
		} catch (Exception e) {
			// TODO: handle exception
		}

	}
}
